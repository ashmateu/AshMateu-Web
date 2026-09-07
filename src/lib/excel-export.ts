import { MercaditoOrder, MercaditoCustomer } from "@/types/mercadito";

/**
 * Genera un archivo Spreadsheet XML de Excel (.xls / .xlsx compatible con Google Drive y Excel)
 * con dos pestañas organizadas:
 * 1. "VENTAS Y RESERVAS"
 * 2. "BASE MARKETING Y CLIENTES"
 */
export function generateExcelWorkbookXML(
  orders: MercaditoOrder[],
  customers: MercaditoCustomer[]
): string {
  const sanitize = (val: any) => {
    if (val === undefined || val === null) return "";
    return String(val)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  // XML Spreadsheet 2003 (Nativo en Excel y Google Drive)
  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
  </Style>
  <Style ss:ID="Header">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#0A0A0A"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#0A0A0A" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="Currency">
   <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
   <NumberFormat ss:Format="&quot;$&quot;#,##0.00"/>
  </Style>
  <Style ss:ID="Badge">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#0A0A0A" ss:Bold="1"/>
   <Interior ss:Color="#E6F4EA" ss:Pattern="Solid"/>
  </Style>
 </Styles>

 <!-- PESTAÑA 1: VENTAS Y RESERVAS -->
 <Worksheet ss:Name="VENTAS Y RESERVAS">
  <Table ss:DefaultRowHeight="20">
   <Column ss:Width="110"/>
   <Column ss:Width="120"/>
   <Column ss:Width="140"/>
   <Column ss:Width="180"/>
   <Column ss:Width="90"/>
   <Column ss:Width="90"/>
   <Column ss:Width="90"/>
   <Column ss:Width="130"/>
   <Column ss:Width="150"/>
   <Column ss:Width="180"/>
   <Column ss:Width="130"/>
   <Column ss:Width="110"/>
   <Column ss:Width="130"/>
   <Row ss:Height="26">
    <Cell ss:StyleID="Header"><Data ss:Type="String">CÓDIGO ORDEN</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">FECHA</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">DISEÑADOR</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">PIEZA ÚNICA</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">VALOR TOTAL</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">SEÑA 80%</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">SALDO 20%</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">ESTADO</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">CLIENTE</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">EMAIL</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">WHATSAPP</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">CIUDAD / PAÍS</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">CANAL DE PAGO</Data></Cell>
   </Row>
   ${orders
     .map(
       (o) => `
   <Row>
    <Cell><Data ss:Type="String">${sanitize(o.orderCode || o.id)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(formatDate(o.createdAt))}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(o.productDesigner)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(o.productName)}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${Number(o.productPrice) || 0}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${Number(o.depositAmount) || 0}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${Number(o.balanceAmount) || 0}</Data></Cell>
    <Cell ss:StyleID="Badge"><Data ss:Type="String">${sanitize(o.status)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(o.buyerName)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(o.buyerEmail)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(o.buyerPhone)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(o.shippingCity ? `${o.shippingCity}, ${o.shippingCountry}` : o.shippingCountry)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(o.paymentMethod)}</Data></Cell>
   </Row>`
     )
     .join("")}
  </Table>
 </Worksheet>

 <!-- PESTAÑA 2: BASE MARKETING Y CLIENTES -->
 <Worksheet ss:Name="BASE MARKETING CLIENTES">
  <Table ss:DefaultRowHeight="20">
   <Column ss:Width="160"/>
   <Column ss:Width="200"/>
   <Column ss:Width="140"/>
   <Column ss:Width="120"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="90"/>
   <Column ss:Width="100"/>
   <Column ss:Width="130"/>
   <Row ss:Height="26">
    <Cell ss:StyleID="Header"><Data ss:Type="String">NOMBRE COMPLETO</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">EMAIL</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">WHATSAPP / TELÉFONO</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">INSTAGRAM</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">CIUDAD</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">PAÍS</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">MARKETING OPT-IN</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">COMPRAS</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">TOTAL GASTADO</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">FECHA REGISTRO</Data></Cell>
   </Row>
   ${customers
     .map(
       (c) => `
   <Row>
    <Cell><Data ss:Type="String">${sanitize(c.name)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(c.email)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(c.phone)}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(c.instagram || "")}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(c.city || "")}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(c.country || "Argentina")}</Data></Cell>
    <Cell ss:StyleID="Badge"><Data ss:Type="String">${c.marketingOptIn ? "SÍ (Autorizado)" : "NO"}</Data></Cell>
    <Cell><Data ss:Type="Number">${c.ordersCount || 0}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${Number(c.totalSpent) || 0}</Data></Cell>
    <Cell><Data ss:Type="String">${sanitize(formatDate(c.firstRegisteredAt))}</Data></Cell>
   </Row>`
     )
     .join("")}
  </Table>
 </Worksheet>
</Workbook>`;
}

/**
 * Genera CSV plano para importar en Mailchimp, Meta Ads o WhatsApp Broadcast
 */
export function generateMarketingCSV(customers: MercaditoCustomer[]): string {
  const headers = [
    "Nombre",
    "Email",
    "Telefono",
    "Instagram",
    "Ciudad",
    "Pais",
    "Acepta_Marketing",
    "Compras_Realizadas",
    "Total_Gastado_USD",
    "Fecha_Registro"
  ];

  const escapeCSV = (str: any) => {
    const s = String(str ?? "");
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const rows = customers.map((c) => [
    escapeCSV(c.name),
    escapeCSV(c.email),
    escapeCSV(c.phone),
    escapeCSV(c.instagram || ""),
    escapeCSV(c.city || ""),
    escapeCSV(c.country || "Argentina"),
    escapeCSV(c.marketingOptIn ? "SI" : "NO"),
    escapeCSV(c.ordersCount || 0),
    escapeCSV(c.totalSpent || 0),
    escapeCSV(c.firstRegisteredAt)
  ].join(","));

  return [headers.join(","), ...rows].join("\n");
}
