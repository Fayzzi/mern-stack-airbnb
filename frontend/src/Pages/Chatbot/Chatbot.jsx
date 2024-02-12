import React, { useEffect } from "react";

const BotpressChat = () => {
  useEffect(() => {
    // Dynamically create script elements for Botpress Web Chat
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://mediafiles.botpress.cloud/6d36dfec-aa97-4555-b034-29121f345b19/webchat/config.js";
    script2.defer = true;

    // Append the script elements to the document body
    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // Clean up: remove the script elements when the component is unmounted
    return () => {
      script1.remove();
      script2.remove();
    };
  }, []);

  return <div id="botpress-chat-container" />;
};

export default BotpressChat;
