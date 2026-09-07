import fs from "fs";
import path from "path";
import { MercaditoCustomer } from "@/types/mercadito";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

const CUSTOMERS_FILE = path.join(process.cwd(), "data", "mercadito-customers.json");

function ensureDataDir() {
  const dir = path.dirname(CUSTOMERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Datos semilla iniciales si el archivo no existe
const SEED_CUSTOMERS: MercaditoCustomer[] = [
  {
    id: "cust-ash-1001",
    name: "Valentina Zenere",
    email: "valentina.zenere@ashmateu.com",
    phone: "+54 9 11 4589-2311",
    instagram: "@valentinazenere",
    city: "Madrid",
    country: "España",
    marketingOptIn: true,
    ordersCount: 2,
    totalSpent: 4200,
    currency: "USD",
    firstRegisteredAt: "2026-08-15T14:20:00.000Z",
    lastActiveAt: "2026-09-02T19:40:00.000Z",
    notes: "Cliente VIP archivo. Amiga del atelier Ash Mateu.",
  },
  {
    id: "cust-ash-1002",
    name: "Camila Morrone",
    email: "camila.morrone@ashmateu.com",
    phone: "+1 310 882-9014",
    instagram: "@camilamorrone",
    city: "Los Ángeles",
    country: "Estados Unidos",
    marketingOptIn: true,
    ordersCount: 1,
    totalSpent: 1319,
    currency: "USD",
    firstRegisteredAt: "2026-08-28T11:15:00.000Z",
    lastActiveAt: "2026-09-01T16:22:00.000Z",
    notes: "Interesada en sastrería vintage y piezas Gianni Versace.",
  }
];

export function getLocalStoredCustomers(): MercaditoCustomer[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(CUSTOMERS_FILE)) {
      fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(SEED_CUSTOMERS, null, 2));
      return SEED_CUSTOMERS;
    }
    const raw = fs.readFileSync(CUSTOMERS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error leyendo mercadito-customers.json:", e);
    return [];
  }
}

export function saveLocalStoredCustomer(customer: MercaditoCustomer): void {
  try {
    ensureDataDir();
    const existing = getLocalStoredCustomers();
    const filtered = existing.filter(
      (c) => c.id !== customer.id && c.email.toLowerCase() !== customer.email.toLowerCase()
    );
    const updated = [customer, ...filtered];
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(updated, null, 2));
  } catch (e) {
    console.error("Error guardando mercadito-customers.json:", e);
  }
}

export async function getAllCustomers(): Promise<MercaditoCustomer[]> {
  const localCustomers = getLocalStoredCustomers();

  // Intentar sincronizar / obtener de Supabase si existe tabla
  try {
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      // Cruzar con datos locales para enriquecer
      const merged = [...localCustomers];

      for (const item of data) {
        if (!merged.some((c) => c.email.toLowerCase() === item.email?.toLowerCase())) {
          merged.push({
            id: item.id || `supa-${Math.random().toString(36).substring(7)}`,
            name: item.name || item.email.split("@")[0],
            email: item.email,
            phone: item.phone || "",
            instagram: item.instagram || "",
            city: item.city || "",
            country: item.country || "Argentina",
            marketingOptIn: item.marketing_opt_in ?? true,
            ordersCount: 0,
            totalSpent: 0,
            currency: "USD",
            firstRegisteredAt: item.created_at || new Date().toISOString(),
            lastActiveAt: item.created_at || new Date().toISOString(),
          });
        }
      }
      return merged;
    }
  } catch (err) {
    // Graceful fallback a almacenamiento local
  }

  return localCustomers;
}

export async function getCustomerByEmail(email: string): Promise<MercaditoCustomer | null> {
  const cleanEmail = email.trim().toLowerCase();
  const all = await getAllCustomers();
  const found = all.find((c) => c.email.toLowerCase() === cleanEmail);
  return found || null;
}

export async function createOrUpdateCustomer(
  data: Partial<MercaditoCustomer> & { email: string; name: string }
): Promise<MercaditoCustomer> {
  const cleanEmail = data.email.trim().toLowerCase();
  const existing = await getCustomerByEmail(cleanEmail);

  const customer: MercaditoCustomer = {
    id: existing?.id || `cust-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    name: data.name.trim(),
    email: cleanEmail,
    phone: data.phone?.trim() || existing?.phone || "",
    instagram: data.instagram?.trim() || existing?.instagram || "",
    city: data.city?.trim() || existing?.city || "",
    country: data.country?.trim() || existing?.country || "Argentina",
    password: data.password || existing?.password || "",
    marketingOptIn: data.marketingOptIn ?? existing?.marketingOptIn ?? true,
    ordersCount: existing ? existing.ordersCount : (data.ordersCount || 0),
    totalSpent: existing ? existing.totalSpent : (data.totalSpent || 0),
    currency: data.currency || existing?.currency || "USD",
    firstRegisteredAt: existing?.firstRegisteredAt || new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    notes: data.notes || existing?.notes || "",
  };

  // 1. Guardar en JSON local
  saveLocalStoredCustomer(customer);

  // 2. Intentar guardar en Supabase
  try {
    await supabase.from("subscribers").upsert(
      {
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        city: customer.city,
        country: customer.country,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );
  } catch (err) {
    // Silencioso
  }

  return customer;
}

export async function recordCustomerOrder(
  email: string,
  amount: number,
  details?: Partial<MercaditoCustomer>
): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();
  const existing = await getCustomerByEmail(cleanEmail);

  if (existing) {
    const updated: MercaditoCustomer = {
      ...existing,
      phone: details?.phone || existing.phone,
      instagram: details?.instagram || existing.instagram,
      city: details?.city || existing.city,
      country: details?.country || existing.country,
      ordersCount: existing.ordersCount + 1,
      totalSpent: existing.totalSpent + Number(amount),
      lastActiveAt: new Date().toISOString(),
    };
    saveLocalStoredCustomer(updated);
  } else if (details?.name) {
    await createOrUpdateCustomer({
      ...details,
      name: details.name,
      email: cleanEmail,
      ordersCount: 1,
      totalSpent: Number(amount),
    });
  }
}

export async function deleteCustomer(idOrEmail: string): Promise<boolean> {
  try {
    ensureDataDir();
    const current = getLocalStoredCustomers();
    const cleanQuery = idOrEmail.trim().toLowerCase();

    const filtered = current.filter(
      (c) => c.id !== idOrEmail && c.email.toLowerCase() !== cleanQuery
    );

    const wasRemoved = filtered.length < current.length;
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(filtered, null, 2));

    // Intentar eliminar de Supabase si existe
    try {
      if (cleanQuery.includes("@")) {
        await supabase.from("subscribers").delete().ilike("email", cleanQuery);
      } else {
        await supabase.from("subscribers").delete().eq("id", idOrEmail);
      }
    } catch (e) {
      // Ignorar error de supabase
    }

    return wasRemoved;
  } catch (err) {
    console.error("Error eliminando cliente:", err);
    return false;
  }
}

