import Check from "./Check";

export default function StateFile(props) {
  return (
    <div className="flex">
      <Check checked={props.formatOk} text="Format du fichier" />
      <Check checked={props.importOk} text="Importation du fichier" />
      <Check checked={props.uploadOk} text="Envoi au serveur" />
    </div>
  );
}
