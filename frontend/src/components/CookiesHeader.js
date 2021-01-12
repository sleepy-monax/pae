import { useState } from "react";

import { Allow, Enabled } from "../services/CookiesService";
import { OutlineBlue } from "./Styles";
import Button from "./Button";

export default function CookiesHeader() {
  const [visible, setVisible] = useState(!Enabled());

  return visible ? (
    <div className="border-b-2 border-yellow-500  p-2 ">
      <div className="flex max-w-4xl mx-auto items-center gap-4">
        <img src="assets/blobcat-cookie.png" alt="" className="max-w-xxxxs" />
        <div className="flex-1">Cette application utilises des cookies</div>
        <Button
          text="J'accepte"
          onClick={() => {
            Allow();
            setVisible(false);
          }}
        />
        <Button
          variante={OutlineBlue}
          text="Je refuse"
          onClick={() => {
            window.location.href =
              "https://www.google.com/search?q=cute+kitten&tbm=isch";
          }}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
