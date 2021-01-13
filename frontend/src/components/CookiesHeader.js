import { useState } from "react";

import { OutlineBlue } from "./Styles";
import Button from "./Button";
import { AllowCookies, EnabledCookies } from "../services/CookiesService";

export default function CookiesHeader() {
  const [visible, setVisible] = useState(!EnabledCookies());

  return visible ? (
    <div className="border-b-2 border-yellow-500  p-2 ">
      <div className="flex max-w-4xl mx-auto items-center gap-4">
        <img src="assets/blobcat-cookie.png" alt="" className="max-w-xxxxs" />
        <div className="flex-1">Cette application utilise des cookies</div>
        <Button
          text="J'accepte"
          onClick={() => {
            AllowCookies();
            setVisible(false);
          }}
        />
        <Button
          variante={OutlineBlue}
          text="Je refuse"
          onClick={() => {
            window.location.href =
              "https://www.google.com/search?q=cookies%20monster&tbm=isch";
          }}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
