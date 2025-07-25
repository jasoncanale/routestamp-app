"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface Currency {
  code: string
  name: string
  symbol: string
  locale: string
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "EUR", name: "Euro", symbol: "€", locale: "de-DE" },
  { code: "GBP", name: "British Pound", symbol: "£", locale: "en-GB" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", locale: "ja-JP" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", locale: "en-CA" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", locale: "en-AU" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", locale: "de-CH" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", locale: "zh-CN" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", locale: "en-IN" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", locale: "pt-BR" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", locale: "ko-KR" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", locale: "es-MX" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", locale: "en-SG" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", locale: "en-NZ" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", locale: "sv-SE" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", locale: "nb-NO" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", locale: "da-DK" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł", locale: "pl-PL" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", locale: "cs-CZ" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", locale: "hu-HU" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", locale: "ru-RU" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", locale: "tr-TR" },
  { code: "ZAR", name: "South African Rand", symbol: "R", locale: "en-ZA" },
  { code: "THB", name: "Thai Baht", symbol: "฿", locale: "th-TH" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", locale: "ms-MY" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", locale: "id-ID" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", locale: "en-PH" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", locale: "vi-VN" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", locale: "ar-EG" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", locale: "en-NG" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", locale: "en-KE" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵", locale: "en-GH" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", locale: "en-UG" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", locale: "sw-TZ" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK", locale: "en-ZM" },
  { code: "BWP", name: "Botswana Pula", symbol: "P", locale: "en-BW" },
  { code: "NAD", name: "Namibian Dollar", symbol: "N$", locale: "en-NA" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨", locale: "en-MU" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨", locale: "en-SC" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "MVR", locale: "dv-MV" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", locale: "si-LK" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", locale: "bn-BD" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨", locale: "ne-NP" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", locale: "ur-PK" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋", locale: "ps-AF" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼", locale: "fa-IR" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د", locale: "ar-IQ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س", locale: "ar-SA" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", locale: "ar-AE" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", locale: "ar-QA" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", locale: "ar-KW" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", locale: "ar-BH" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع.", locale: "ar-OM" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا", locale: "ar-JO" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل", locale: "ar-LB" },
  { code: "SYP", name: "Syrian Pound", symbol: "ل.س", locale: "ar-SY" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼", locale: "ar-YE" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", locale: "he-IL" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", locale: "es-PE" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", locale: "es-CL" },
  { code: "COP", name: "Colombian Peso", symbol: "$", locale: "es-CO" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", locale: "es-AR" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$", locale: "es-UY" },
  { code: "PYG", name: "Paraguayan Guaraní", symbol: "₲", locale: "es-PY" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs", locale: "es-BO" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q", locale: "es-GT" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L", locale: "es-HN" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$", locale: "es-NI" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡", locale: "es-CR" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/.", locale: "es-PA" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$", locale: "es-DO" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G", locale: "ht-HT" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "J$", locale: "en-JM" },
  { code: "TTD", name: "Trinidad & Tobago Dollar", symbol: "TT$", locale: "en-TT" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "Bds$", locale: "en-BB" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "EC$", locale: "en-AG" },
  { code: "BZD", name: "Belize Dollar", symbol: "BZ$", locale: "en-BZ" },
  { code: "GYD", name: "Guyanese Dollar", symbol: "G$", locale: "en-GY" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$", locale: "nl-SR" },
  { code: "FJD", name: "Fijian Dollar", symbol: "FJ$", locale: "en-FJ" },
  { code: "WST", name: "Samoan Tālā", symbol: "T", locale: "sm-WS" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$", locale: "to-TO" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT", locale: "bi-VU" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "SI$", locale: "en-SB" },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K", locale: "en-PG" },
  { code: "KID", name: "Kiribati Dollar", symbol: "$", locale: "en-KI" },
  { code: "TVD", name: "Tuvaluan Dollar", symbol: "$", locale: "en-TV" }
]

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatCurrency: (amount: number) => string
  getSystemCurrency: () => Currency
  currencies: Currency[]
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const CURRENCY_STORAGE_KEY = 'routestamp-currency'

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0]) // Default to USD

  // Load currency from localStorage on mount
  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY)
      if (savedCurrency) {
        const parsedCurrency = JSON.parse(savedCurrency)
        setCurrencyState(parsedCurrency)
      } else {
        // Try to detect system currency
        const systemCurrency = getSystemCurrency()
        setCurrencyState(systemCurrency)
      }
    } catch (error) {
      console.error('Error loading currency from localStorage:', error)
      // Fallback to USD if localStorage fails
      setCurrencyState(currencies[0])
    }
  }, [])

  // Save currency to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(currency))
    } catch (error) {
      console.error('Error saving currency to localStorage:', error)
    }
  }, [currency])

  const getSystemCurrency = (): Currency => {
    try {
      // Try to detect user's locale and find matching currency
      const userLocale = navigator.language || 'en-US'
      const userCountry = userLocale.split('-')[1] || 'US'
      
      // Map common country codes to currencies
      const countryCurrencyMap: { [key: string]: string } = {
        'US': 'USD', 'CA': 'CAD', 'GB': 'GBP', 'DE': 'EUR', 'FR': 'EUR',
        'IT': 'EUR', 'ES': 'EUR', 'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR',
        'IE': 'EUR', 'FI': 'EUR', 'PT': 'EUR', 'GR': 'EUR', 'CY': 'EUR',
        'MT': 'EUR', 'SI': 'EUR', 'SK': 'EUR', 'EE': 'EUR', 'LV': 'EUR',
        'LT': 'EUR', 'LU': 'EUR', 'JP': 'JPY', 'AU': 'AUD', 'NZ': 'NZD',
        'CH': 'CHF', 'SE': 'SEK', 'NO': 'NOK', 'DK': 'DKK', 'PL': 'PLN',
        'CZ': 'CZK', 'HU': 'HUF', 'RU': 'RUB', 'TR': 'TRY', 'ZA': 'ZAR',
        'TH': 'THB', 'MY': 'MYR', 'ID': 'IDR', 'PH': 'PHP', 'VN': 'VND',
        'SG': 'SGD', 'IN': 'INR', 'BR': 'BRL', 'MX': 'MXN', 'AR': 'ARS',
        'CL': 'CLP', 'CO': 'COP', 'PE': 'PEN', 'UY': 'UYU', 'PY': 'PYG',
        'BO': 'BOB', 'GT': 'GTQ', 'HN': 'HNL', 'NI': 'NIO', 'CR': 'CRC',
        'PA': 'PAB', 'DO': 'DOP', 'HT': 'HTG', 'JM': 'JMD', 'TT': 'TTD',
        'BB': 'BBD', 'AG': 'XCD', 'BZ': 'BZD', 'GY': 'GYD', 'SR': 'SRD',
        'FJ': 'FJD', 'WS': 'WST', 'TO': 'TOP', 'VU': 'VUV', 'SB': 'SBD',
        'PG': 'PGK', 'KI': 'KID', 'TV': 'TVD', 'CN': 'CNY', 'KR': 'KRW',
        'TW': 'TWD', 'HK': 'HKD', 'MO': 'MOP', 'AE': 'AED', 'SA': 'SAR',
        'QA': 'QAR', 'KW': 'KWD', 'BH': 'BHD', 'OM': 'OMR', 'JO': 'JOD',
        'LB': 'LBP', 'SY': 'SYP', 'YE': 'YER', 'IL': 'ILS', 'EG': 'EGP',
        'NG': 'NGN', 'KE': 'KES', 'GH': 'GHS', 'UG': 'UGX', 'TZ': 'TZS',
        'ZM': 'ZMW', 'BW': 'BWP', 'NA': 'NAD', 'MU': 'MUR', 'SC': 'SCR',
        'MV': 'MVR', 'LK': 'LKR', 'BD': 'BDT', 'NP': 'NPR', 'PK': 'PKR',
        'AF': 'AFN', 'IR': 'IRR', 'IQ': 'IQD'
      }
      
      const detectedCurrencyCode = countryCurrencyMap[userCountry] || 'USD'
      const detectedCurrency = currencies.find(c => c.code === detectedCurrencyCode) || currencies[0]
      
      return detectedCurrency
    } catch (error) {
      console.error('Error detecting system currency:', error)
      return currencies[0] // Fallback to USD
    }
  }

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
  }

  const formatCurrency = (amount: number): string => {
    try {
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount)
    } catch (error) {
      console.error('Error formatting currency:', error)
      return `${currency.symbol}${amount.toFixed(2)}`
    }
  }

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      formatCurrency,
      getSystemCurrency,
      currencies
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
} 