import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articles from "../article-content.js";
import AddCommentForm from "../components/AddCommentForm.js";
import CommentList from "../components/CommentsList.js";
import NotFoundPage from "./NotFoundPage.js";

const ArticlePage = () => {
  // const params = useParams(); // the hook gets the last part of the url
  // const articleId = params.articleId;
  const { articleName } = useParams();

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const loadArticle = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/articles/${articleName}`
      );
      const newArticleInfo = response.data;
      console.log(newArticleInfo);
      setArticleInfo(newArticleInfo);
    };

    loadArticle();
  }, []);

  const article = articles.find((article) => article.name === articleName);

  const addUpvote = async () => {
    const response = await axios.put(
      `http://localhost:8000/api/articles/${articleName}/upvote`
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>
          This article has {articleInfo.upvotes}{" "}
          {articleInfo.upvotes === 1 ? "upvote" : "upvotes"}
        </p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <AddCommentForm
        articleName={articleName}
        onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
      />
      <CommentList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
