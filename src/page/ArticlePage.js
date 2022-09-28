import { useParams } from "react-router-dom";
import articles from "../article-content.js";

const ArticlePage = () => {
  // const params = useParams(); // the hook gets the last part of the url
  // const articleId = params.articleId;
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  return (
    <>
      <h1>{articleId.title}</h1>
      {article.content.map((paragraph) => (
        <p>{paragraph}</p>
      ))}
    </>
  );
};

export default ArticlePage;
