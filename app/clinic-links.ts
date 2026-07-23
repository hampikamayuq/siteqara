export const clinicContact = Object.freeze({
  whatsappNumber: "5521992189718",
  whatsappUrl: "https://wa.me/5521992189718",
  whatsappFloatingUrl: "https://wa.me/5521992189718?text=Ol%C3%A1+conheci+o+trabalho+da+Clinica+pela+p%C3%A1gina+e+gostaria+de+agendar+uma+consulta.",
  telephone: "+55-21-99218-9718",
  telephoneHref: "tel:+5521992189718",
  email: "contato@clinicaqara.com.br",
  emailHref: "mailto:contato@clinicaqara.com.br",
  mapsUrl: "https://maps.app.goo.gl/uRAQvNVj4cGekVDB9",
  mapsEmbedUrl: "https://www.google.com/maps?q=Cl%C3%ADnica%20QARA%2C%20Rua%20Santa%20Clara%2050%2C%20Copacabana%2C%20Rio%20de%20Janeiro&z=17&output=embed",
  doctoraliaUrl: "https://www.doctoralia.com.br/clinicas/clinica-qara-2",
});

export function whatsappHref(message: string): string {
  return `${clinicContact.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function whatsappApiHref(message: string): string {
  return `https://api.whatsapp.com/send?phone=${clinicContact.whatsappNumber}&text=${encodeURIComponent(message)}`;
}

export const appointmentLinks = Object.freeze({
  home: clinicContact.whatsappFloatingUrl,
  diego: whatsappApiHref("Olá, tudo bem? Gostaria de agendar uma consulta com o Dr. Diego Galvez"),
  cabeloDiana: whatsappApiHref("Olá, tudo bem? Gostaria de agendar uma consulta de cabelo com a Dra. Diana Stohmann"),
  miguel: whatsappApiHref("Olá, tudo bem? Gostaria de agendar uma consulta com o Dr. Miguel Ceccarelli"),
  manuelaDermatiteAtopica: whatsappApiHref("Olá, tudo bem? Gostaria de agendar uma consulta de dermatite atópica com a Dra. Manuela Pedretti Cabral"),
  manuelaPsoriase: whatsappApiHref("Olá, tudo bem? Gostaria de agendar uma consulta de psoríase com a Dra. Manuela Pedretti Cabral"),
  manuelaHidrosadenite: whatsappApiHref("Olá, tudo bem? Gostaria de agendar uma consulta de hidrosadenite com a Dra. Manuela Pedretti Cabral"),
  dermatopediatria: whatsappApiHref("Olá, tudo bem? Gostaria de agendar uma consulta de dermatopediatria"),
});
