import React, { useState } from 'react';
import posts from "./blog-post.json";
import Link from 'next/link';

const About = () => {
  
  return (
    <main className="main" >
        <section id="feed">
          <div className="container">
            <ul>
              {posts.map((post, i) => (
                <li key={i}>
                  
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title"> {post.title}</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the cards content.
                        </p>

                        <Link href={`/blog/${post.id}`}  className="btn btn-primary">  
                          {post.title}
                        </Link>
                      </div>
                    </div>
                  
                </li>
              ))}
            </ul>
          </div>
        </section>
    </main>
  );
};

export default About;