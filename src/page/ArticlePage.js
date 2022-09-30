import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articles from "../article-content.js";
import CommentList from "../components/CommentsList.js";
import NotFoundPage from "./NotFoundPage.js";

const ArticlePage = () => {
  // const params = useParams(); // the hook gets the last part of the url
  // const articleId = params.articleId;
  const { articleId } = useParams();

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const loadArticle = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/articles/${articleId}`
      );
      const newArticleInfo = response.data;
      console.log(newArticleInfo);
      setArticleInfo(newArticleInfo);
    };

    loadArticle();
  }, []);

  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <CommentList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
