import { Link } from "react-router-dom";
import articles from "../article-content";
const ArticleListPage = () => {
  return (
    <>
      <h2>Articles</h2>
      {articles.map((article) => (
        <Link
          className="article-list-item"
          key={article.name}
          to={`/articles/${article.name}`}
        >
          <h4>{article.title}</h4>
          <p>{article.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </>
  );
};

export default ArticleListPage;
