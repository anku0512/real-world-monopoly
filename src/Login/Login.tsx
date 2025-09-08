// Login.tsx (simplified example)
import React, { useState } from 'react';
import { auth, googleProvider, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailPasswordAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            if (isRegister) {
                // Sign up new user
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCred.user;
                // Initialize user profile in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    balance: 1000000,  // starting money, e.g. 1,000,000
                    netWorth: 1000000,
                    name: user.displayName || "",  // displayName might be null for email signup
                });
            } else {
                // Sign in existing user
                await signInWithEmailAndPassword(auth, email, password);
            }
            // On success, Firebase auth state will change and we can redirect to main game
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCred = await signInWithPopup(auth, googleProvider);
            const user = userCred.user;
            // If new user, create Firestore doc
            const userDocRef = doc(db, "users", user.uid);
            // We can use setDoc with { merge: true } to avoid overwriting if it exists
            await setDoc(userDocRef, {
                email: user.email,
                name: user.displayName,
                balance: 1000000,
                netWorth: 1000000
            }, { merge: true });
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <form onSubmit={handleEmailPasswordAuth}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">{isRegister ? "Sign Up" : "Sign In"}</button>
            </form>
            {error && <p className="error">{error}</p>}
            <button onClick={handleGoogleLogin}>Sign In with Google</button>
            <p onClick={() => setIsRegister(prev => !prev)}>
                {isRegister ? "Have an account? Log in" : "No account? Register"}
            </p>
        </div>
    );
};

export default Login;
