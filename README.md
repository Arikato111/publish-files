## publish files

the front end website for share files. it works with firebase.

### Setup

- #### Firebase
  - enable `Authentification`
  - enable `Storage`
  - Storage rules

  ```js
  rules_version = '2';

  service firebase.storage {
    match /b/{bucket}/o {
     match /{allPaths=**} {
        allow read;
        allow write: if request.auth.uid != null && request.auth.uid == "__your uid__";
      }
    }
  }
  ```

### TODOs

- [ ] more explain.
- [ ] update front end ui.
- [ ] make code less complex.