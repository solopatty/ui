export const TOKEN_ADDRESSES = {
  PATTY: "0x126F0c11F3e5EafE37AB143D4AA688429ef7DCB3",
  CHEESE: "0x5D7714751FAf22a96F7D2eAC15304839242cF8c0",
  LETTUCE: "0xF7aE103AacD84641Fa0c43860C23a8Cf7cE5DB5a",
} as const;

export type TokenSymbol = keyof typeof TOKEN_ADDRESSES;

export const TOKEN_SYMBOLS = ["PATTY", "CHEESE", "LETTUCE"] as const;

export const getTokenAddress = (symbol: TokenSymbol): `0x${string}` => {
  return TOKEN_ADDRESSES[symbol] as `0x${string}`;
};

export const getTokenSymbol = (address: string): TokenSymbol | undefined => {
  const entry = Object.entries(TOKEN_ADDRESSES).find(
    ([_, addr]) => addr.toLowerCase() === address.toLowerCase()
  );
  return entry ? (entry[0] as TokenSymbol) : undefined;
};

export const isValidTokenAddress = (address: string): boolean => {
  return Object.values(TOKEN_ADDRESSES).some(
    (addr) => addr.toLowerCase() === address.toLowerCase()
  );
};
