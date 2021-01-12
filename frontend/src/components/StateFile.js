import Check from "./Check";

export default function StateFile(props) {
  console.log("props:");
  console.log(props);

  return (
    <div className="flex">
      <Check checked={props.formatOk} text="Format du fichier" />
      <Check checked={props.structureOk} text="Structure du fichier" />
      <Check checked={props.dataOk} text="Données valides" />
    </div>
  );
}
