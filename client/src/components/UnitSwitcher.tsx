import { faC, faF } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Unit } from "../types";

export default function UnitSwitcher({
  unit,
  switcher,
}: {
  unit: Unit;
  switcher: () => void;
}) {
  return (
    <button className={`btn`} aria-label="Unit switcher" onClick={switcher}>
      {unit == "C" ? (
        <FontAwesomeIcon icon={faC} className="size-6" />
      ) : (
        <FontAwesomeIcon icon={faF} className="size-6" />
      )}
    </button>
  );
}
