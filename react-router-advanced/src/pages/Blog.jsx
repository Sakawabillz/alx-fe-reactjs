import { Link } from "react-router-dom";

const posts = [
  { id: "1", title: "Getting Started with React Router" },
  { id: "2", title: "Understanding Nested Routes" },
  { id: "3", title: "Protecting Routes with Auth" },
];

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <Link to={`/blog/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
      <p>Dynamic route example 👉 <code>/blog/:id</code></p>
    </div>
  );
}
