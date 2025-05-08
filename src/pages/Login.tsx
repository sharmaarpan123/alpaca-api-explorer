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
  const { toast } = useToast();
  const {  authDispatch } = useAuth()
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
   
  } = useApiMutation("/api/v1/user/login", {
    onSuccess: (data: any) => {
      const success = checkResponse({
        res: data,
      
      });
      if (success) {
        localStorage.setItem("accountId", data?.data?.data?.accountId);
        localStorage.setItem("token", data?.data?.data?.accessToken);
        localStorage.setItem("refreshToken", data?.data?.data?.refreshToken);
        authDispatch({
          type: authContextActionsTypeEnum.LOGIN,
          payload: {
            token: data?.data?.data?.accessToken,
            accountId: data?.data?.data?.accountId,
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
  } , {
    headers: {
      "privateApiKey": privateKey,
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(
     { email, password  }  
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deviden-gray py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img
              src="/deviden-logo.png"
              alt="Logo"
              className="h-12 w-auto"
            />
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

            <div className="space-y-2">
             
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
             <Input
               type="text"
               placeholder="Enter your private key"
               value={privateKey}
               onChange={(e) => setPrivateKey(e.target.value)}
               required
             />
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
