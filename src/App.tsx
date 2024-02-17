import { QuestionModule } from "@libs/modules/question";
import { QueryProvider } from "@libs/provider";

const App = () => {
  return (
    <QueryProvider>
      <QuestionModule />
    </QueryProvider>
  );
};

export default App;
