import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
 <div className="flex items-center flex-col gap-10 justify-center min-h-screen max-2xl:gap-4">
 <h1 className="text-4xl font-bold inline-block ">Login Gemini</h1>   
 <SignIn path="/sign-in" signUpUrl='/sign-up' forceRedirectUrl='/dashboard'  />
 </div>
);

export default SignInPage;