// EMH Digital
// https://instantdb.com/dash?s=main&t=home&app=90ce8bcd-38c8-4ee5-a168-7d10d24966eb

import { i } from "@instantdb/react";

const INSTANT_APP_ID = "90ce8bcd-38c8-4ee5-a168-7d10d24966eb";

const graph = i.graph(
  INSTANT_APP_ID,
  {
    "bookmarks": i.entity({
      "createdAt": i.any(),
      "description": i.any(),
      "faviconUrl": i.any(),
      "host": i.any(),
      "image": i.any(),
      "title": i.any(),
      "updatedAt": i.any(),
      "url": i.any(),
    }),
    "drawings": i.entity({
      "name": i.any(),
      "state": i.any(),
    }),
    "goals": i.entity({
      "email": i.any(),
    }),
    "journal-entries": i.entity({
      "createdAt": i.any(),
      "excerpt": i.any(),
      "featureImage": i.any(),
      "published": i.any(),
      "publishedAt": i.any().indexed(),
      "slug": i.any().unique(),
      "text": i.any(),
      "title": i.any(),
      "updatedAt": i.any(),
    }),
    "memberships": i.entity({
      "teamId": i.any(),
      "userEmail": i.any(),
      "userId": i.any(),
    }),
    "roles": i.entity({
      "name": i.any().unique(),
    }),
    "teams": i.entity({
      "creatorId": i.any(),
      "name": i.any(),
    }),
    "templates": i.entity({
      "from": i.any(),
      "poetry-reading": i.any(),
      "prose-reading": i.any(),
      "scripture-callout": i.any(),
      "template-body": i.any(),
      "title": i.any(),
    }),
    "todos": i.entity({
      "completed": i.any(),
      "createdAt": i.any(),
      "name": i.any(),
      "updatedAt": i.any(),
    }),
    "users": i.entity({
      "avatar": i.any(),
      "createdAt": i.any(),
      "email": i.any().unique(),
      "name": i.any(),
      "updatedAt": i.any(),
      "userId": i.any().unique(),
      "username": i.any().unique(),
    }),
  },
  {
    "drawingsTeams": {
      "forward": {
        "on": "drawings",
        "has": "many",
        "label": "teams"
      },
      "reverse": {
        "on": "teams",
        "has": "many",
        "label": "drawings"
      }
    },
    "membershipsTeams": {
      "forward": {
        "on": "memberships",
        "has": "many",
        "label": "teams"
      },
      "reverse": {
        "on": "teams",
        "has": "many",
        "label": "memberships"
      }
    },
    "usersBookmarks": {
      "forward": {
        "on": "users",
        "has": "many",
        "label": "bookmarks"
      },
      "reverse": {
        "on": "bookmarks",
        "has": "many",
        "label": "users"
      }
    },
    "usersJournal-entries": {
      "forward": {
        "on": "users",
        "has": "many",
        "label": "journal-entries"
      },
      "reverse": {
        "on": "journal-entries",
        "has": "one",
        "label": "author"
      }
    },
    "usersRoles": {
      "forward": {
        "on": "users",
        "has": "many",
        "label": "roles"
      },
      "reverse": {
        "on": "roles",
        "has": "one",
        "label": "users"
      }
    },
    "usersTodos": {
      "forward": {
        "on": "users",
        "has": "many",
        "label": "todos"
      },
      "reverse": {
        "on": "todos",
        "has": "one",
        "label": "users"
      }
    }
  }
);

export default graph;
