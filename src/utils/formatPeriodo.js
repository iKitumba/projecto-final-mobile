export const formatPeriodo = ({ periodo }) => {
  switch (periodo) {
    case "TARDE":
      return "Tarde";
    case "NOITE":
      return "Noite";
    default:
      return "Manhã";
  }
};
