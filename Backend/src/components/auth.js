import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth"

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    }; //I am currently watching https://www.youtube.com/watch?v=2hR-uWjBAgw&ab_channel=PedroTech
    //I am at 19:57
    return (
        <div>
            <input
                placeholder = "Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder = "Password..."
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}> Sign In</button>
        </div>
    );


};