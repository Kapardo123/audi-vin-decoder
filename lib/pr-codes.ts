export interface PRCode {
  code: string;
  description: string;
}

export const popularPRCodes: Record<string, string> = {
  // --- Zawieszenie i Układ Jezdny ---
  "1BA": "Zawieszenie standardowe / tłumienie",
  "1BE": "Zawieszenie sportowe",
  "1BV": "Zawieszenie sportowe S line",
  "1BK": "Zawieszenie pneumatyczne (Adaptive Air Suspension)",
  "1BH": "Zawieszenie z regulacją twardości",
  "1BD": "Zawieszenie sportowe (Audi Sport GmbH)",
  "1BR": "Zawieszenie na złe drogi (+20mm)",
  "1BC": "Zawieszenie dla pojazdów specjalnych",
  "1BL": "Zawieszenie z regulacją tłumienia (Drive Select)",
  "2MS": "Zawieszenie sportowe (Audi Sport)",
  "2MT": "Zawieszenie sportowe (S-model)",

  // --- Napęd i Skrzynia Biegów ---
  "1X1": "Napęd quattro (4x4)",
  "1X0": "Napęd na przednie koła (FWD)",
  "G1G": "8-stopniowa automatyczna skrzynia biegów (Tiptronic)",
  "G1C": "7-stopniowa automatyczna skrzynia biegów (S-tronic)",
  "G0K": "6-biegowa manualna skrzynia biegów",
  "G0Z": "Zmienna skrzynia biegów (Multitronic)",
  "0G7": "Tiptronic",
  "0G8": "Półautomatyczna skrzynia biegów",
  "1AJ": "System ABS, EDS, ASR",
  "1AT": "System ABS, EDS, ASR, ESP",
  "1N1": "Wspomaganie układu kierowniczego",
  "1N3": "Servotronic (wspomaganie zależne od prędkości)",
  "1N7": "Dynamiczny układ kierowniczy",

  // --- Silniki (Przykładowe kody bazowe) ---
  "TR1": "Silnik wysokoprężny 6-cylindrowy 3.0 l (TDI)",
  "D4I": "Silnik benzynowy 4-cylindrowy 2.0 l (TFSI)",
  "T4N": "Silnik 1.9 TDI",
  "T5T": "Silnik 2.5 TDI",
  "T5Z": "Silnik 1.8 Turbo",
  "D2L": "Silnik 2.0 TDI",
  "D3B": "Silnik 2.0 TFSI",

  // --- Hamulce ---
  "1LA": "Hamulce tarczowe z przodu (320mm)",
  "1LB": "Hamulce tarczowe z przodu (288mm)",
  "1LD": "Hamulce tarczowe z przodu (312mm)",
  "1LE": "Hamulce tarczowe z przodu (ATE)",
  "1LF": "Hamulce tarczowe z przodu (345mm - S4)",
  "1LJ": "Hamulce tarczowe z przodu (314mm)",
  "1LZ": "Hamulce tarczowe z przodu (Lucas)",
  "1KW": "Hamulce tarczowe z tyłu (288mm)",
  "1KD": "Hamulce tarczowe z tyłu (245mm)",
  "1KP": "Hamulce tarczowe z tyłu (255mm)",
  "1KE": "Hamulce tarczowe z tyłu (300mm)",

  // --- Fotele i Wnętrze ---
  "Q1D": "Fotele sportowe (przód)",
  "Q1A": "Fotele standardowe",
  "Q1W": "Fotele sportowe S (przód)",
  "Q2J": "Fotele komfortowe (przód)",
  "Q4H": "Fotele sportowe/komfortowe (przód)",
  "3L3": "Ręczna regulacja wysokości foteli przednich",
  "3L4": "Elektryczna regulacja foteli przednich z pamięcią dla kierowcy",
  "3L5": "Elektryczna regulacja obu foteli przednich",
  "4A3": "Ogrzewanie foteli przednich",
  "4A4": "Ogrzewanie foteli przednich i tylnych",
  "7P1": "Elektryczna regulacja podparcia lędźwiowego",
  "3NZ": "Tylna kanapa dzielona i składana",

  // --- Kierownice ---
  "1MR": "Kierownica skórzana (4-ramienna)",
  "2PV": "Kierownica sportowa skórzana (3-ramienna)",
  "2ZQ": "Kierownica wielofunkcyjna skórzana",
  "1XB": "Kierownica sportowa (drewno)",
  "2PF": "Kierownica sportowa, spłaszczona u dołu",

  // --- Oświetlenie ---
  "8IT": "Reflektory LED",
  "8G4": "Reflektory Matrix LED",
  "8EX": "Reflektory LED (USA)",
  "8K1": "Światła do jazdy dziennej (DRL)",
  "8K4": "Światła do jazdy dziennej LED",
  "8Q3": "Dynamiczna regulacja zasięgu reflektorów",
  "8Q5": "Adaptacyjne doświetlanie zakrętów",
  "8X1": "Układ zmywania reflektorów",
  "8N6": "Czujnik deszczu i zmierzchu",

  // --- Systemy Wspomagania i Multimedia ---
  "7UG": "MMI Navigation plus z MMI touch",
  "7T6": "System nawigacji (MID)",
  "9VS": "Nagłośnienie Bang & Olufsen Premium Sound",
  "9VD": "Audi Sound System",
  "9VK": "Nagłośnienie Bang & Olufsen",
  "8UD": "Radio Concert",
  "9AK": "Klimatyzacja automatyczna (2-strefowa)",
  "9AQ": "Klimatyzacja automatyczna (3-strefowa)",
  "7X2": "System parkowania plus (przód i tył)",
  "7X5": "Asystent parkowania",
  "8T1": "Tempomat",
  "7K1": "Kontrola ciśnienia w oponach",
  "4I3": "Keyless Entry (dostęp bezkluczykowy)",
  "4K4": "Centralny zamek z pilotem",
  "9Q2": "System informacji kierowcy (FIS) kolorowy",
  "9Q4": "Wyświetlacz wielofunkcyjny / komputer pokładowy",

  // --- Pakiety Wyposażenia ---
  "PQD": "Pakiet zewnętrzny S line",
  "WQS": "Pakiet sportowy S line",
  "E4J": "Wersja S line",
  "QE1": "Pakiet schowek",
  "QQ1": "Pakiet oświetlenia wnętrza (Ambient)",

  // --- Inne ---
  "1D0": "Bez haka holowniczego",
  "1D2": "Hak holowniczy demontowalny",
  "3FE": "Szyberdach szklany, elektryczny",
  "4GQ": "Przednia szyba termoizolacyjna",
  "1G1": "Koło zapasowe dojazdowe",
  "1G2": "Pełnowymiarowe koło zapasowe (stalowe)",
  "1G3": "Pełnowymiarowe koło zapasowe (alu)",
  "0FE": "Zakład produkcyjny Ingolstadt",
  "0FF": "Zakład produkcyjny Neckarsulm",
  "0FM": "Zakład produkcyjny Polska",
  "0FK": "Zakład produkcyjny Bratysława",
};

export function decodePRCode(code: string): string {
  const upperCode = code.toUpperCase().trim();
  return popularPRCodes[upperCode] || "Nieznany kod wyposażenia";
}
