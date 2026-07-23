export const clinicContact = Object.freeze({
  whatsappNumber: "5521992189718",
  whatsappUrl: "https://wa.me/5521992189718",
  telephone: "+55-21-99218-9718",
  telephoneHref: "tel:+5521992189718",
  email: "contato@clinicaqara.com.br",
  emailHref: "mailto:contato@clinicaqara.com.br",
  mapsUrl: "https://www.google.com/maps/place/Cl%C3%ADnica+QARA/@-22.9717237,-43.1869868,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICp1ZzO9gE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWk7XCEk_ldeGIZtGX3qU8zThjkRR2ad_TBZKBkw__YmLZFe_DtY4LgKFZeJDTGGjn9BY08aCcZ6unD4N0-P0OhzvwFHdET6ERnxEZLmE2IbXttr0APMBhGNGPpJM-_HxSN4u6AY%3Dw128-h86-k-no!7i3870!8i2583!4m7!3m6!1s0x9bd5c690781749:0xd8efa1efc0385245!8m2!3d-22.9716311!4d-43.1868668!10e5!16s%2Fg%2F11v6b1n885?entry=ttu",
  doctoraliaUrl: "https://www.doctoralia.com.br/clinicas/clinica-qara-2",
});

export function whatsappHref(message: string): string {
  return `${clinicContact.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
