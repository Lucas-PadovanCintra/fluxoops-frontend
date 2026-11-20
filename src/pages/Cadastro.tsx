
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/services/api";
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

export default function Cadastro() {
  const navigate = useNavigate();
  const { cadastro } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      await cadastro(nome.trim(), email.trim(), senha);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setErro("Este email já está cadastrado.");
      } else {
        setErro("Não foi possível criar a conta. Tente novamente.");
      }
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

          <CardTitle className="text-2xl">Criar conta no FluxoOps</CardTitle>

          <CardDescription>
            Preencha seus dados para começar a utilizar o sistema.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Seu nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                placeholder="Repita sua senha"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {erro && (
              <p role="alert" className="text-sm text-destructive">
                {erro}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={carregando}>
              {carregando ? "Criando conta..." : "Criar conta"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Entrar
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
