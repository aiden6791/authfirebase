import { FirebaseError } from "firebase/app";
import { useCallback, useState } from "react";

export function useError() {

  const [ferror, setError] = useState<FirebaseError | null>(null);
  const [format, setFormat] = useState('');

  const handleError = useCallback((error: FirebaseError | null) => {

    let message = "";

    if(error) {
      switch(error.code) {
        case "auth/wrong-password": message = "パスワードが違います";  break;
        case "auth/user-not-found": message = "登録されてるメールを見つかれません"; break;
        case "auth/email-already-in-use": message = "お使いのメールです"; break;
        case "auth/invalid-email": message = "メールの形式が正しくありません"; break;
      }
      setError(error);
      setFormat(message);
    } else {
      setError(null);
      setFormat('');
    }
  }, []);

  return { handleError, ferror, format } as const;
}