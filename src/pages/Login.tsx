import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContextActionsTypeEnum, useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useApiMutation } from "@/lib/mutations";
import { checkResponse } from "@/utilities/commonFuncs";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showPass, setShowPass] = useState({
    password: false,
    privateKey: false,
  });
  const { toast } = useToast();
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useApiMutation(
    "/api/v1/user/loginDocument",
    {
      onSuccess: (data: any) => {
        const success = checkResponse({
          res: data,
        })?.success;
        if (success) {
          localStorage.setItem("accountId", data?.data?.data?.accountId);
          localStorage.setItem("token", data?.data?.data?.accessToken);
          localStorage.setItem("refreshToken", data?.data?.data?.refreshToken);
          localStorage.setItem("privateKey", privateKey);
          authDispatch({
            type: authContextActionsTypeEnum.LOGIN,
            payload: {
              token: data?.data?.data?.accessToken,
              accountId: data?.data?.data?.accountId,
              privateKey : privateKey
            },
          });
          navigate("/");
        } else {
          toast({
            title: "Error",
            description: data?.data?.data,
            variant: "destructive",
          });
        }
      },
    },
    {
      headers: {
        privateApiKey: privateKey,
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deviden-gray py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img src="/deviden-logo.png" alt="Logo" className="h-12 w-auto" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the API Explorer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPass.password ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10" // space for the icon
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPass((p) => ({ ...p, password: !p.password }))
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPass.password ? eyeclose : eyeopen}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPass.privateKey ? "text" : "password"}
                  placeholder="Enter your private key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  required
                  className="pr-10" // space for the icon
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPass((p) => ({ ...p, privateKey: !p.privateKey }))
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPass.privateKey ? eyeclose : eyeopen}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-deviden-blue hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

// svg

const eyeopen = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#A1A9B6"
      d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
    />
  </svg>
);

const eyeclose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#A1A9B6"
      d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
    />
  </svg>
);
