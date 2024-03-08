import Head from "next/head";
import { Accordion, Button, Image, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../Spinner";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Blog() {
    type user = {
        name: string;
        username: string;
        email: any;
        website: any;
        id: number;
        length: number;
    };

    const [show, setShow] = useState(false);
    const [modaldata , setShowdata] = useState<user>();
    const handleClose = () => setShow(false);

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<user[]>([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    const handleOpenModal = (id: number) => {
        const getUserById = (userID: number) => {
            return users.find((user) => user.id === userID);
        };

        let found: any = getUserById(id);
        setShowdata(found);
    };

    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        swipeToSlide: true,
        pauseOnHover: true,
    };

    type menu = {
        name: string;
        link: any;
        sub: any;
    };

    const menus: menu[] = [
        {
            name: "England",
            link: "1",
            sub: [
                { name: "Arsenal", link: "0-0", sub: null },
                { name: "Liverpool", link: "0-1", sub: null },
                { name: "Manchester United", link: "0-2", sub: null },
            ],
        },
        { name: "Croatia", link: "0", sub: "" },
        {
            name: "Spain",
            link: "2",
            sub: [
                { name: "Barcelona", link: "2-0", sub: null },
                { name: "Real Madrid", link: "2-1", sub: null },
            ],
        },
        {
            name: "Germany",
            link: "3",
            sub: [
                { name: "Bayern Munich", link: "3-1", sub: null },
                { name: "Borrusia Dortmund", link: "3-2", sub: null },
            ],
        },
    ];

    const fetchData: any = () => {
        setIsLoading(true);
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                setTimeout(() => {
                    setUsers(response.data);
                    setIsLoading(false);
                }, 300);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const [sortKey, setSortKey] = useState("");

    const handleSortChange = (e: any) => {
        const selectedSortKey = e.target.value;

        if (selectedSortKey !== "") {
            setSortKey(selectedSortKey);

            const sortedItems = [...users].sort((a, b) => {
                if (selectedSortKey === "asc") {
                    if (a.username < b.username) return -1;
                    if (a.username > b.username) return 1;
                    return a.id - b.id; // Sort by id if usernames are equal
                } else if (selectedSortKey === "desc") {
                    if (a.username < b.username) return 1;
                    if (a.username > b.username) return -1;
                    return b.id - a.id; // Sort by id in descending order if usernames are equal
                } else if (selectedSortKey === "none") {
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;
                    return 0; // No sorting for id
                }
                return 0; // No sorting
            });

            setUsers(sortedItems);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className="agile-banner-section">
                <div className="agile-banner-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="agile-banner-content">
                                    <div className="heading">
                                        <h3></h3>
                                        <h1 className="page-heading">Hello</h1>
                                        <p>Lorem Ipsum!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card-section">
                <div className="container">
                    <div className="card-container">
                        <div className="row gx-3">
                            <div className="col-lg-3 col-md-4">
                                <div className="card-left">
                                    <h3>Categories</h3>
                                    <Accordion defaultActiveKey="0" alwaysOpen>
                                        {menus.map((menu: any, index: any) => {
                                            return (
                                                <>
                                                    <Accordion.Item eventKey={index} key={index}>
                                                        <Accordion.Header>{menu.name}</Accordion.Header>
                                                        <Accordion.Body>
                                                            <ul>
                                                                {menu.sub.length > 0 && (
                                                                    <>
                                                                        {menu.sub.map((c: any, index: any) => (
                                                                            <li key={index}>
                                                                                <a href="#">{c.name}</a>
                                                                            </li>
                                                                        ))}
                                                                    </>
                                                                )}

                                                                {menu.sub.length == 0 && (
                                                                    <>
                                                                        <li>
                                                                            <a>No Recoreds</a>
                                                                        </li>
                                                                    </>
                                                                )}
                                                            </ul>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </>
                                            );
                                        })}
                                    </Accordion>
                                </div>
                            </div>

                            <div className="col-lg-9 col-md-8">
                                <div>
                                    <div className="row ">
                                        <div className="col-lg-8">
                                            <input
                                                placeholder="Enter Post Title"
                                                className="form-control"
                                                onChange={(event) => setQuery(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            {/* <button onClick={handleSortChange}>
                        Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                      </button> */}
                                            <select
                                                id="sortSelect"
                                                className="form-select"
                                                value={sortKey}
                                                onChange={handleSortChange}
                                            >
                                                <option value="none">None</option>
                                                <option value="asc">A - Z</option>
                                                <option value="desc">Z - A</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="card-right">
                                        {isLoading ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <>
                                                {users.length > 0 && (
                                                    <div className="row ">
                                                        {users
                                                            .filter((user: user) => {
                                                                if (query === "") {
                                                                    return user;
                                                                } else if (
                                                                    user.username
                                                                        .toLowerCase()
                                                                        .includes(query.toLowerCase())
                                                                ) {
                                                                    return user;
                                                                } else if (user.length > 0) {
                                                                    return <>No</>;
                                                                }
                                                            })
                                                            .map((user: user, index: number) => {
                                                                return (
                                                                    <div
                                                                        className="col-lg-4 col-md-6 col-sm-6 mb-4"
                                                                        key={index}
                                                                    >
                                                                        {/* <div className="card" onClick={() => { setShow(true); } }> */}
                                                                        <div
                                                                            className="card"
                                                                            onClick={() => {
                                                                                handleOpenModal(user.id);
                                                                                setShow(true);
                                                                            }}
                                                                        >
                                                                            <div className="card-img">
                                                                                {/* <img
                                            src="https://mir-s3-cdn-cf.behance.net/projects/404/5779e0133762633.Y3JvcCwxMTkyLDkzMywxMTIsMA.jpg"
                                            className="card-img-top"
                                            alt="..."
                                          /> */}
                                                                            </div>

                                                                            <div className="card-body">
                                                                                <h5 className="card-title">
                                                                                    {user.username}
                                                                                </h5>
                                                                                <p className="card-text mb-2">
                                                                                    {user.email}
                                                                                </p>
                                                                                <p className="card-text">
                                                                                    {user.website}
                                                                                </p>

                                                                                <ul>
                                                                                    <li>
                                                                                        <a href="#!">Item</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#!">Item</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#!">Item</a>
                                                                                    </li>
                                                                                </ul>

                                                                                <Link href={`/blog/${user.id}`}>
                                                                                    {user.id}
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2> Single Item</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card-section overflow-hidden">
                <div className="container">
                    <div className="position-relative">
                        <div className="process-slider">
                            <Slider {...settings}>
                                {users.map((user: user, index: number) => {
                                    return (
                                        <div className="card card-new" key={index}>
                                            <div className="card-img"></div>
                                            <div className="card-body">
                                                <h5 className="card-title">{user.username}</h5>
                                                <p className="card-text mb-2">{user.email}</p>
                                                <p className="card-text">{user.website}</p>

                                                <ul>
                                                    <li>
                                                        <a href="#!">Item</a>
                                                    </li>
                                                    <li>
                                                        <a href="#!">Item</a>
                                                    </li>
                                                    <li>
                                                        <a href="#!">Item</a>
                                                    </li>
                                                </ul>

                                                <Link href={`/blog/${user.id}`}>{user.id}</Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                fullscreen={"xl-down"}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Hello! <strong>{modaldata?.name}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>Name : </strong>
                        {modaldata?.id}
                    </p>
                    <p>
                        <strong>Email : </strong>
                        {modaldata?.email}
                    </p>
                    <p>
                        <strong>Email : </strong>
                        {modaldata?.website}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Next</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
