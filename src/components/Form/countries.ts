export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  dialCode: string;
  emoji: string;
  placeholder: string;
  expectedLength: number; // Expected length of the local number
  currency: string; // ISO 4217 Currency Code
}

export const COUNTRIES: Country[] = [
  {
    name: "Cameroon",
    code: "CM",
    dialCode: "237",
    emoji: "🇨🇲",
    placeholder: "6 50 12 34 56",
    expectedLength: 9,
    currency: "XAF",
  },
  {
    name: "Nigeria",
    code: "NG",
    dialCode: "234",
    emoji: "🇳🇬",
    placeholder: "801 234 5678",
    expectedLength: 10,
    currency: "NGN",
  },
  {
    name: "Ghana",
    code: "GH",
    dialCode: "233",
    emoji: "🇬🇭",
    placeholder: "20 123 4567",
    expectedLength: 9,
    currency: "GHS",
  },
  {
    name: "Ivory Coast",
    code: "CI",
    dialCode: "225",
    emoji: "🇨🇮",
    placeholder: "07 12 34 56 78",
    expectedLength: 10,
    currency: "XOF",
  },
  {
    name: "Senegal",
    code: "SN",
    dialCode: "221",
    emoji: "🇸🇳",
    placeholder: "77 123 45 67",
    expectedLength: 9,
    currency: "XOF",
  },
  {
    name: "Benin",
    code: "BJ",
    dialCode: "229",
    emoji: "🇧🇯",
    placeholder: "97 12 34 56",
    expectedLength: 8,
    currency: "XOF",
  },
  {
    name: "Burkina Faso",
    code: "BF",
    dialCode: "226",
    emoji: "🇧🇫",
    placeholder: "70 12 34 56",
    expectedLength: 8,
    currency: "XOF",
  },
  {
    name: "Guinea",
    code: "GN",
    dialCode: "224",
    emoji: "🇬🇳",
    placeholder: "620 12 34 56",
    expectedLength: 9,
    currency: "GNF",
  },
  {
    name: "Rwanda",
    code: "RW",
    dialCode: "250",
    emoji: "🇷🇼",
    placeholder: "788 123 456",
    expectedLength: 9,
    currency: "RWF",
  },
  {
    name: "Congo (Brazzaville)",
    code: "CG",
    dialCode: "242",
    emoji: "🇨🇬",
    placeholder: "05 123 45 67",
    expectedLength: 9,
    currency: "XAF",
  },
   {
    name: "South Africa",
    code: "ZA",
    dialCode: "27",
    emoji: "🇿🇦",
    placeholder: "71 234 5678",
    expectedLength: 9,
    currency: "ZAR",
  },
  {
    name: "Uganda",
    code: "UG",
    dialCode: "256",
    emoji: "🇺🇬",
    placeholder: "701 234 567",
    expectedLength: 9,
    currency: "UGX",
  },
];
