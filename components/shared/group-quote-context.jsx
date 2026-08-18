"use client";

import { createContext, useContext, useMemo, useState } from "react";

const GroupQuoteContext = createContext({
  handoff: null,
  sendHandoff: () => {},
});

/**
 * Bridges the GroupQuote wizard's "Continue to the form" step to QuotePanel's
 * requirements field — the two are unrelated client components elsewhere on
 * the same server-rendered page, so a shared ancestor context is the only way
 * to carry the wizard's answers across without prop-drilling through the
 * server tree.
 */
export function GroupQuoteProvider({ children }) {
  const [handoff, setHandoff] = useState(null);

  const value = useMemo(
    () => ({
      handoff,
      sendHandoff: (payload) => setHandoff({ ...payload, id: Symbol() }),
    }),
    [handoff],
  );

  return (
    <GroupQuoteContext.Provider value={value}>
      {children}
    </GroupQuoteContext.Provider>
  );
}

export function useGroupQuoteHandoff() {
  return useContext(GroupQuoteContext);
}
