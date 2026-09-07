import fs from "fs";
import path from "path";
import { MercaditoCustomer } from "@/types/mercadito";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

const CUSTOMERS_FILE = path.join(process.cwd(), "data", "mercadito-customers.json");

function ensureDataDir() {
  try {
    const dir = path.dirname(CUSTOMERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    // Ignorar en entornos de solo lectura
  }
}

function safeWriteCustomersFile(customers: MercaditoCustomer[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2));
  } catch (e: any) {
    // En Vercel Serverless (AWS Lambda), el filesystem es de solo lectura (EROFS).
    // Es normal y seguro: la persistencia primaria está en Supabase.
    if (e.code !== "EROFS") {
      console.warn("Aviso al escribir mercadito-customers.json:", e.message);
    }
  }
}

// Datos semilla de muestra inicial si no hay registros
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
    if (!fs.existsSync(CUSTOMERS_FILE)) {
      safeWriteCustomersFile(SEED_CUSTOMERS);
      return SEED_CUSTOMERS;
    }
    const raw = fs.readFileSync(CUSTOMERS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function saveLocalStoredCustomer(customer: MercaditoCustomer): void {
  try {
    const existing = getLocalStoredCustomers();
    const filtered = existing.filter(
      (c) => c.id !== customer.id && c.email.toLowerCase() !== customer.email.toLowerCase()
    );
    const updated = [customer, ...filtered];
    safeWriteCustomersFile(updated);
  } catch (e) {
    // Silencioso
  }
}

function parseCustomerFromRow(row: any): MercaditoCustomer {
  const raw = row.mp_raw || {};
  return {
    id: raw.id || row.notes || row.id || `cust-${Date.now()}`,
    name: raw.name || row.buyer_name || row.customer_name || "Cliente",
    email: (raw.email || row.buyer_email || "").toLowerCase().trim(),
    phone: raw.phone || row.buyer_phone || row.customer_phone || "",
    instagram: raw.instagram || "",
    city: raw.city || row.shipping_city || "",
    country: raw.country || row.shipping_country || "Argentina",
    password: raw.password || "",
    marketingOptIn: raw.marketingOptIn ?? true,
    ordersCount: Number(raw.ordersCount || 0),
    totalSpent: Number(raw.totalSpent || 0),
    currency: raw.currency || row.currency || "USD",
    firstRegisteredAt: raw.firstRegisteredAt || row.created_at || new Date().toISOString(),
    lastActiveAt: raw.lastActiveAt || row.updated_at || row.created_at || new Date().toISOString(),
    notes: raw.notes || row.notes || "",
  };
}

export async function getAllCustomers(): Promise<MercaditoCustomer[]> {
  // 1. Obtener conjunto de clientes eliminados (tombstones) de Supabase
  const deletedSet = new Set<string>();
  try {
    const { data: tombstones } = await supabase
      .from("orders")
      .select("buyer_email, notes, mp_raw")
      .eq("status", "customer_deleted");

    if (tombstones && tombstones.length > 0) {
      for (const t of tombstones) {
        if (t.buyer_email) deletedSet.add(t.buyer_email.toLowerCase().trim());
        if (t.notes) deletedSet.add(t.notes.toLowerCase().trim());
        if (t.mp_raw?.id) deletedSet.add(String(t.mp_raw.id).toLowerCase().trim());
        if (t.mp_raw?.email) deletedSet.add(String(t.mp_raw.email).toLowerCase().trim());
        if (t.mp_raw?.target) deletedSet.add(String(t.mp_raw.target).toLowerCase().trim());
      }
    }
  } catch (err) {
    console.warn("Aviso al consultar eliminados de Supabase:", err);
  }

  // 2. Obtener perfiles registrados explícitamente en Supabase
  const customerMap = new Map<string, MercaditoCustomer>();
  try {
    const { data: profiles } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "customer_profile")
      .order("created_at", { ascending: false });

    if (profiles && profiles.length > 0) {
      for (const row of profiles) {
        const cust = parseCustomerFromRow(row);
        if (cust.email && !deletedSet.has(cust.email) && !deletedSet.has(cust.id.toLowerCase())) {
          customerMap.set(cust.email, cust);
        }
      }
    }
  } catch (err) {
    console.warn("Aviso al consultar perfiles en Supabase:", err);
  }

  // 3. Obtener clientes de órdenes reales (compras) en Supabase para enriquecer métricas
  try {
    const { data: realOrders } = await supabase
      .from("orders")
      .select("buyer_email, buyer_name, buyer_phone, shipping_city, shipping_country, amount, currency, created_at, status")
      .not("status", "in", '("customer_profile","customer_deleted")');

    if (realOrders && realOrders.length > 0) {
      for (const o of realOrders) {
        const email = (o.buyer_email || "").toLowerCase().trim();
        if (!email || deletedSet.has(email)) continue;

        const orderAmt = Number(o.amount || 0);
        const existing = customerMap.get(email);

        if (existing) {
          existing.ordersCount = (existing.ordersCount || 0) + 1;
          existing.totalSpent = (existing.totalSpent || 0) + orderAmt;
          if (!existing.phone && o.buyer_phone) existing.phone = o.buyer_phone;
          if (!existing.city && o.shipping_city) existing.city = o.shipping_city;
          if (o.created_at && (!existing.lastActiveAt || new Date(o.created_at) > new Date(existing.lastActiveAt))) {
            existing.lastActiveAt = o.created_at;
          }
        } else {
          customerMap.set(email, {
            id: `cust-order-${email.replace(/[^a-zA-Z0-9]/g, "")}`,
            name: o.buyer_name || email.split("@")[0],
            email: email,
            phone: o.buyer_phone || "",
            instagram: "",
            city: o.shipping_city || "",
            country: o.shipping_country || "Argentina",
            marketingOptIn: true,
            ordersCount: 1,
            totalSpent: orderAmt,
            currency: o.currency || "USD",
            firstRegisteredAt: o.created_at || new Date().toISOString(),
            lastActiveAt: o.created_at || new Date().toISOString(),
            notes: "Cliente registrado automáticamente por reserva de pieza",
          });
        }
      }
    }
  } catch (err) {
    console.warn("Aviso al consultar órdenes para base de clientes:", err);
  }

  // 4. Cruzar con datos locales (seed / JSON) sólo si no están en deletedSet
  const localCustomers = getLocalStoredCustomers();
  for (const localCust of localCustomers) {
    const email = localCust.email.toLowerCase().trim();
    const id = localCust.id.toLowerCase().trim();

    if (deletedSet.has(email) || deletedSet.has(id)) {
      continue; // Fue eliminado
    }

    if (!customerMap.has(email)) {
      customerMap.set(email, localCust);
    }
  }

  // 5. Devolver lista limpia garantizando exclusión de eliminados
  const results = Array.from(customerMap.values()).filter((c) => {
    const email = c.email.toLowerCase().trim();
    const id = c.id.toLowerCase().trim();
    return !deletedSet.has(email) && !deletedSet.has(id);
  });

  return results;
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

  // Si este cliente estaba previamente marcado como eliminado, levantar la lápida
  try {
    await supabase
      .from("orders")
      .delete()
      .eq("status", "customer_deleted")
      .ilike("buyer_email", cleanEmail);
  } catch (e) {}

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

  // 1. Guardar o actualizar en Supabase (tabla orders con status 'customer_profile')
  try {
    // Eliminar registro previo de perfil si existía para evitar duplicados
    await supabase
      .from("orders")
      .delete()
      .eq("status", "customer_profile")
      .ilike("buyer_email", cleanEmail);

    await supabase.from("orders").insert({
      status: "customer_profile",
      buyer_email: cleanEmail,
      buyer_name: customer.name,
      buyer_phone: customer.phone,
      shipping_city: customer.city,
      shipping_country: customer.country,
      notes: customer.id,
      mp_raw: customer,
    });
  } catch (err) {
    console.warn("Aviso al guardar perfil en Supabase:", err);
  }

  // 2. Guardar en JSON local si el filesystem lo permite
  saveLocalStoredCustomer(customer);

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
    await createOrUpdateCustomer(updated);
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

export async function deleteCustomer(idOrEmail: string, emailHint?: string): Promise<boolean> {
  try {
    const clean = idOrEmail.trim();
    const cleanLower = clean.toLowerCase();
    const hintLower = emailHint ? emailHint.trim().toLowerCase() : "";

    // 1. Resolver el email y el id del cliente buscando en la base actual
    const all = await getAllCustomers();
    const target = all.find(
      (c) => c.id === clean || c.email.toLowerCase() === cleanLower || (hintLower && c.email.toLowerCase() === hintLower)
    );

    const emailToDelete = target?.email.toLowerCase() || (cleanLower.includes("@") ? cleanLower : hintLower);
    const idToDelete = target?.id || clean;

    // 2. Eliminar cualquier perfil activo en Supabase
    try {
      if (emailToDelete) {
        await supabase
          .from("orders")
          .delete()
          .eq("status", "customer_profile")
          .ilike("buyer_email", emailToDelete);
      }
      if (idToDelete) {
        await supabase
          .from("orders")
          .delete()
          .eq("status", "customer_profile")
          .eq("notes", idToDelete);
      }
    } catch (supaErr) {
      console.warn("Aviso al eliminar perfiles de Supabase:", supaErr);
    }

    // 3. Registrar lápida (tombstone) permanente en Supabase
    // Esto asegura que incluso los datos seed o archivos estáticos queden bloqueados para siempre
    try {
      await supabase.from("orders").insert({
        status: "customer_deleted",
        buyer_email: emailToDelete || cleanLower,
        notes: idToDelete,
        mp_raw: {
          deletedAt: new Date().toISOString(),
          id: idToDelete,
          email: emailToDelete,
          target: clean,
        },
      });
    } catch (tombErr) {
      console.warn("Aviso al registrar tombstone de cliente en Supabase:", tombErr);
    }

    // 4. Intentar eliminar de archivo JSON local si el filesystem lo permite
    try {
      const current = getLocalStoredCustomers();
      const filtered = current.filter(
        (c) => c.id !== idToDelete && c.email.toLowerCase() !== emailToDelete && c.email.toLowerCase() !== cleanLower
      );
      safeWriteCustomersFile(filtered);
    } catch (fsErr) {
      // Ignorar en Vercel
    }

    return true;
  } catch (err) {
    console.error("Error eliminando cliente:", err);
    return false;
  }
}
