
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await login(email, senha);
      navigate("/", { replace: true });
    } catch {
      setErro("Não foi possível entrar. Verifique suas credenciais e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          <CardTitle className="text-2xl">FluxoOps</CardTitle>

          <CardDescription>
            Entre com suas credenciais para acessar o sistema.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>

            {erro && (
              <p role="alert" className="text-sm text-destructive">
                {erro}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Ainda não tem uma conta?{" "}
              <Link
                to="/cadastro"
                className="text-primary font-medium hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
