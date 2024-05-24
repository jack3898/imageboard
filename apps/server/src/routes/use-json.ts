import express, { type Router } from "express";

export default (router: Router): void => {
  router.use(express.json());
};
