# Plan strony Monika Narożna

## Cel
Responsywna, szybka i minimalistyczna strona po polsku dla marki Monika Narożna, przygotowana do pozyskiwania klientów z Polski. Strona ma prezentować usługi z obszaru neurologopedii, logopedii i terapii ruchowej oraz prowadzić użytkownika do kontaktu telefonicznego, e-mailowego lub przez formularz.

## Kierunek wizualny
- Motyw: spokojna, premium opieka terapeutyczna bez klinicznego chłodu.
- Kolory: ciemna zieleń jako kolor zaufania i stabilności, ciepły beż jako tło, miodowy jako akcent konwersyjny.
- Układ: dużo oddechu, kontrastowe sekcje, wyraźne CTA nad linią zgięcia, krótkie bloki tekstu, karty usług i proces krok po kroku.
- Brak zdjęć: zgodnie z materiałami klienta interfejs opiera się na typografii, abstrakcyjnych kształtach CSS i miejscu na późniejsze materiały.

## Architektura
React + Vite + TypeScript + React Router. Statyczny frontend bez backendu i bazy danych, ponieważ formularz ma w tej wersji walidować dane lokalnie i potwierdzać przyjęcie zapytania; integrację z pocztą można dodać po otrzymaniu dostawcy formularzy.

Trasy:
- `/` - Start
- `/uslugi` - lista usług
- `/uslugi/:slug` - szczegóły konkretnej usługi
- `/o-mnie` - podejście i proces współpracy
- `/kontakt` - dane kontaktowe i formularz
- `*` - strona 404

## SEO i indeksowanie
- Jedno H1 na każdej trasie oraz logiczne H2/H3.
- Unikalne tytuły i meta descriptions ustawiane dla każdej trasy.
- JSON-LD `MedicalBusiness`/`Person` z danymi, które są znane: nazwa Monika Narożna, telefon i e-mail; bez zmyślania adresu.
- `public/robots.txt`, `public/sitemap.xml`, `public/manus-routes.json`.
- `lang="pl"`, semantyczne landmarks, opisy alt tylko dla rzeczywistych grafik logo.
- Do czasu otrzymania adresu nie deklaruję fikcyjnego miasta ani canonical URL.

## Wydajność i dostępność
- Bez ciężkich bibliotek UI ani dużych obrazów.
- CSS w jednym pliku, systemowe fonty, animacje ograniczone do transform/opacity.
- Mobilne menu obsługiwane przez React z `aria-expanded` i animowanym panelem.
- Scroll-to-top przy zmianie trasy; kotwice zachowują przewijanie do sekcji.
- Focus-visible, kontrast, etykiety pól formularza, komunikaty statusu.
- Statyczne assety mogą być długotrwale cache'owane, HTML powinien się odświeżać przy nowej wersji.

## Weryfikacja
- Instalacja zależności i `pnpm build`.
- Rejestracja diagnostyki TypeScript hosta.
- HTTP check dev servera.
- Kontrola `/manus-routes.json`, `/robots.txt`, `/sitemap.xml` oraz obecności głównych tras w źródle.
