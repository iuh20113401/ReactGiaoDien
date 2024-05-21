import { HiMoon, HiSun } from "react-icons/hi2";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import { Button } from "../../../ui/Button";

function ToogleDarkMode() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <Button
      size="xs"
      bgcolor="transparent"
      color="var(--color--secondary_8)"
      shadow="none"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <HiMoon size="1.6rem" /> : <HiSun size="1.6rem" />}
    </Button>
  );
}

export default ToogleDarkMode;
