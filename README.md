# Swapsies

This is a PoC project that previews swapping tokens from one blockchain to another using the [Li.Fi SDK](https://docs.li.fi/integrate-li.fi-sdk/li.fi-sdk-overview)

## Install

```sh
$ npm install
```

## Run locally

```sh
$ npm run dev
```

## Assumptions

The following assumptions and considerations were made:

1. This project is meant to serve as a Proof of Concept and demonstration of Li.Fi SDK capabilities. As such, having a fast development workflow and getting quickly to a working version was deemed important and selection of framework, tools and libraries was influenced by this. Building a stable version tailored for long-term support will result in reevaluation of the tech stack.
2. A tool that that integrates Li.Fi already exists and could be used for demonstration purposes (if this was the only goal) - [Li.Fi Playground](https://playground.li.fi/)
3. Free tier usage of Li.Fi is constrained by requests count. Existing implementation does not do caching of responses and debouncing of requests as it's not a core functionality, but it could lead to quickly reaching the limit and the displaying an error.
4. There could be multiple routes that lead to swapping token A for B. It is not specified which one we need, so the existing solution only displays details about the cheapest route.
5. Tests were explicitly listed as not required and were skipped to accomodate time constraints. However, in any project targetting live environment, tests should be mandatory.
6. Others - to be discussed over project review call.


## Contributing

