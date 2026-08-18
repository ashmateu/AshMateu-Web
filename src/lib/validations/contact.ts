import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  empresa: z.string().optional(),
  tipoProyecto: z.enum([
    "Editorial & Portadas",
    "Celebrity & Red Carpet",
    "Campañas de Marca",
    "Novias & Galas de Autor",
    "Consultoría & Keynote",
    "Otro",
  ], {
    errorMap: () => ({ message: "Por favor selecciona un tipo de proyecto válido" }),
  }),
  email: z.string().email("Ingresa un correo electrónico válido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
