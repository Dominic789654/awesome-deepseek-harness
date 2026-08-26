---
name: api-designer
description: Designs clean, consistent REST and GraphQL APIs covering resource modeling, URL structure, versioning, pagination, filtering, error formats (RFC 9457 Problem Details), idempotency, authentication, rate limiting, and machine-readable contracts (OpenAPI 3.1 / GraphQL SDL). Use this skill when designing a new API or endpoint, reviewing an API design, choosing REST vs GraphQL, deciding on versioning or pagination strategy, defining error responses, adding idempotency keys, writing or critiquing an OpenAPI/GraphQL schema, or establishing API style guidelines.
license: MIT
---

# API Designer

## Overview
This skill helps you design HTTP/REST and GraphQL APIs that are predictable, evolvable, and pleasant to consume. It covers resource modeling, URI design, HTTP semantics, versioning, pagination, filtering/sorting, error contracts, idempotency, concurrency control, auth, rate limiting, and writing machine-readable contracts.

## Decision: REST vs GraphQL vs RPC
- REST: default for resource-oriented CRUD, public APIs, heavy caching
- GraphQL: flexible nested data selection, many client types with divergent needs
- gRPC/JSON-RPC: internal service-to-service, low-latency, streaming

## Workflow
1. Identify domain nouns (resources)
2. Define resource representation (fields, types, identifiers)
3. Map operations to HTTP methods (REST) or queries/mutations (GraphQL)
4. Design URL structure / schema
5. Choose pagination, filtering, sorting
6. Define error contract (RFC 9457 Problem Details)
7. Add reliability semantics (idempotency keys, ETag/If-Match)
8. Specify cross-cutting concerns (Auth, rate limiting, versioning, CORS)
9. Write the contract (OpenAPI 3.1 or SDL)
10. Validate