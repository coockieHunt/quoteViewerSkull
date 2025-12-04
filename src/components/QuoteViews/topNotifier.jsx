import { useEffect, useState } from "react";

const TopNotifier = ({ message, trigger, timeout = 3000 }) => {
    const [visible, setVisible] = useState(false);
    const [displayMessage, setDisplayMessage] = useState("");

    useEffect(() => {
        if (message && message.trim() !== "") {setDisplayMessage(message);}
    }, [message]);
    useEffect(() => {
        if (trigger !== undefined) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, timeout);
            return () => clearTimeout(timer);
        };
    }, [trigger, timeout]);

    return (
        <div className={`topNotifier ${visible ? "visible_TopNotifier" : "hidden_TopNotifier"}`}>
            <p>{displayMessage}</p>
        </div>
    );
};

export default TopNotifier;
