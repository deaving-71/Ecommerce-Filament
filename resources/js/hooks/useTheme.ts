import { useCallback, useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"

export function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "dark")

  useEffect(() => {
    document.querySelector("html")?.setAttribute("class", theme)
    document
      .querySelector("html")
      ?.setAttribute("style", `color-scheme: ${theme}`)
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme]
  )

  return { theme, toggleTheme }
}
