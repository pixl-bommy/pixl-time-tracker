import React, { useEffect, useRef, useState } from "react";
import "./OverlayAddAction.scss";

interface OvverlayAddActionProps {
   open?: boolean;
   onCancel: () => void;
   onCreate: (action: string, indicator: string) => void;
}

export default function OverlayAddAction({
   open,
   onCancel,
   onCreate,
}: OvverlayAddActionProps): JSX.Element {
   const [actionName, setActionName] = useState("");
   const [actionIndicator, setActionIndicator] = useState("");
   const [indicator, setIndicator] = useState("");

   const focusRef = useRef<HTMLInputElement>();

   useEffect(() => {
      setIndicator(actionIndicator || actionName.toLocaleLowerCase());
   }, [actionName, actionIndicator]);

   useEffect(() => {
      setActionName("");
      setActionIndicator("");
   }, [open]);

   useEffect(() => {
      if (focusRef.current) {
         focusRef.current.focus();
      }
   }, [open, focusRef.current]);

   if (!open) return null;

   return (
      <div className="fullscreen-overlay">
         <div className="OverlayAddAction overlay">
            <input
               type="text"
               placeholder="new action name"
               onChange={(event) => setActionName(event?.target?.value)}
               value={actionName}
               ref={focusRef}
            />
            <input
               type="text"
               placeholder="action indicator"
               onChange={(event) => setActionIndicator(event?.target?.value)}
               value={indicator}
            />

            <div className="overlay-action">
               <input type="button" value="cancel" onClick={onCancel} />
               <input type="button" value="ok" onClick={() => onCreate(actionName, indicator)} />
            </div>
         </div>
      </div>
   );
}