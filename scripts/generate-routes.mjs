import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = new URL("../dist/", import.meta.url);
const routes = [
  { path: "/uslugi", title: "Usługi terapeutyczne - Monika Narożna", description: "Poznaj usługi Moniki Narożnej: neurologopedię, logopedię, fizjoterapię, osteopatię, uroginekologię, treningi medyczne i biofeedback.", h1: "Usługi, które odpowiadają na różne potrzeby.", body: "Neurologopedia, logopedia, ruch, osteopatia i uroginekologia w jednym miejscu." },
  { path: "/o-mnie", title: "O mnie i podejściu do terapii - Monika Narożna", description: "Sprawdź, jak wygląda pierwszy kontakt, jak porządkujemy potrzeby i jak może wyglądać dalszy kierunek współpracy z Moniką Narożną.", h1: "Uważność, wiedza i ruch - w Twoim tempie.", body: "Monika Narożna to przestrzeń do rozmowy o mowie, ciele i codziennym funkcjonowaniu." },
  { path: "/kontakt", title: "Kontakt - Monika Narożna", description: "Skontaktuj się z Moniką Narożną telefonicznie, mailowo lub przez formularz i opowiedz, czego potrzebujesz.", h1: "Opowiedz, czego potrzebujesz.", body: "Zadzwoń pod +48 696 777 270 lub napisz na Narozna.monika@gmail.com." },
  { path: "/uslugi/logopedia", title: "Logopedia - Monika Narożna", description: "Logopedia u Moniki Narożnej - uważna praca nad komunikacją, artykulacją i codziennym komfortem mówienia.", h1: "Logopedia", body: "Uważna praca nad komunikacją, artykulacją i codziennym komfortem mówienia." },
  { path: "/uslugi/fizjoterapia", title: "Fizjoterapia - Monika Narożna", description: "Fizjoterapia u Moniki Narożnej - praca z ruchem i ciałem oparta na poznaniu Twojej sytuacji.", h1: "Fizjoterapia", body: "Praca z ruchem i ciałem oparta na poznaniu Twojej sytuacji." },
  { path: "/uslugi/osteopatia", title: "Osteopatia - Monika Narożna", description: "Osteopatia u Moniki Narożnej - holistyczne spojrzenie na ciało i jego wzajemne zależności.", h1: "Osteopatia", body: "Holistyczne spojrzenie na ciało i jego wzajemne zależności." },
  { path: "/uslugi/uroginekologia", title: "Uroginekologia - Monika Narożna", description: "Uroginekologia u Moniki Narożnej - wsparcie w obszarze dna miednicy, oddechu i codziennego ruchu.", h1: "Uroginekologia", body: "Wsparcie w obszarze dna miednicy, oddechu i codziennego ruchu." },
  { path: "/uslugi/treningi-medyczne", title: "Treningi medyczne - Monika Narożna", description: "Treningi medyczne u Moniki Narożnej - ruch dopasowany do możliwości, celu i aktualnej kondycji.", h1: "Treningi medyczne", body: "Ruch dopasowany do możliwości, celu i aktualnej kondycji." },
  { path: "/uslugi/neurologopedia-pediatryczna", title: "Neurologopedia pediatryczna - Monika Narożna", description: "Neurologopedia pediatryczna u Moniki Narożnej - spokojne wsparcie rozwoju komunikacji dziecka i jego bliskich.", h1: "Neurologopedia pediatryczna", body: "Spokojne wsparcie rozwoju komunikacji dziecka i jego bliskich." },
  { path: "/uslugi/biofeedback-uroginekologiczny", title: "Biofeedback uroginekologiczny - Monika Narożna", description: "Biofeedback uroginekologiczny u Moniki Narożnej - świadoma praca z sygnałami ciała w obszarze dna miednicy.", h1: "Biofeedback uroginekologiczny", body: "Świadoma praca z sygnałami ciała w obszarze dna miednicy." },
  { path: "/uslugi/neurologopedia-ortodontyczna-kliniczna", title: "Neurologopedia ortodontyczna i kliniczna - Monika Narożna", description: "Neurologopedia ortodontyczna i kliniczna u Moniki Narożnej - wsparcie funkcji związanych z mową, oddechem i pracą aparatu oralnego.", h1: "Neurologopedia ortodontyczna i kliniczna", body: "Wsparcie funkcji związanych z mową, oddechem i pracą aparatu oralnego." },
];

const indexPath = new URL("index.html", root);
const index = await readFile(indexPath, "utf8");
for (const route of routes) {
  const target = new URL(`.${route.path}/index.html`, root);
  await mkdir(dirname(target.pathname), { recursive: true });
  let html = index
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript><main><h1>${route.h1}</h1><p>${route.body}</p><p>Kontakt: <a href="tel:+48696777270">+48 696 777 270</a> · <a href="mailto:Narozna.monika@gmail.com">Narozna.monika@gmail.com</a></p></main></noscript>`);
  await writeFile(target, html);
}
console.log(`Generated ${routes.length} SEO route documents.`);
