/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';
import { StoreContext } from '../../App';

interface Comments {
    postId: number;
    id: string;
    name: string;
    email: string;
    body: string;
}

export default function Home() {
    const [comments, setComments] = useState<Comments[]>([]);
    const [comment, setComment] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    useEffect(() => {
        async function fetchData() {
            fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
                .then((data) => data.json())
                .then((response) => setComments(response));
        }
        if (isLoaded) {
            fetchData();
        }
        return () => setIsLoaded(false);
    }, [isLoaded]);

    const onHandleClick = useCallback(
        (commentEl) =>
            (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                console.log(commentEl);
            },
        []
    );

    const onHandleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <StoreContext.Consumer>
            {(store: any) => (
                <div className="homepage" data-testid="homepage">
                    <h1>Hello Here</h1>
                    <ul data-testid="comment-list">
                        {comments.map((com) => {
                            return (
                                <li
                                    className="commentElements"
                                    data-testid="comment"
                                    key={com.id}
                                >
                                    <ul className="comment">
                                        <li>{com.id}</li>
                                        <li>{com.name}</li>
                                        <li>{com.email}</li>
                                        <li>{com.body}</li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={onHandleClick(com)}
                                            >
                                                Voir plus
                                            </button>
                                        </li>
                                    </ul>
                                    <br />
                                </li>
                            );
                        })}
                    </ul>
                    <div className="comment_form">
                        <h2>Ajouter un commentaire</h2>
                        <div className="email">
                            <label htmlFor="email">
                                Email :
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={onHandleChange}
                                />
                            </label>
                        </div>
                        <div className="name">
                            <label htmlFor="name">
                                Name :
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={onHandleChange}
                                />
                            </label>
                        </div>
                        <div className="body">
                            <label htmlFor="body">Name :</label>
                            <textarea
                                rows={10}
                                cols={100}
                                placeholder="Ajouter un commentaire..."
                                id="body"
                                name="body"
                                onChange={onHandleChange}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => store.setComment(comment)}
                            >
                                Ajouter le commentaire
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </StoreContext.Consumer>
    );
}
