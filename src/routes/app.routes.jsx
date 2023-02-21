import { useContext } from "react";

import UnloggedRoutes from "./unlogged.routes";

import { AuthContext } from "../contexts/AuthContext";
import AdminRoutes from "./admin.routes";
import ProfessorRoutes from "./professor.routes";
import AlunoRoutes from "./aluno.routes";
import Loading from "../components/Loading";

export default function AppRoutes() {
  const { logged, usuario, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (
    (logged && usuario.tipo_usuario === "ADMIN") ||
    (logged && usuario.tipo_usuario === "PROFESSOR_ADMIN")
  ) {
    return <AdminRoutes />;
  }

  if (logged && usuario.tipo_usuario === "PROFESSOR") {
    return <ProfessorRoutes />;
  }

  if (logged && usuario.turma_id) {
    return <AlunoRoutes />;
  }

  return <UnloggedRoutes />;
}
