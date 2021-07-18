# Meme Chooser App

Show a meme belonging to selected keyword built with Vue.<br>
This app is intended to apply a clean architecture.

<br>

## 💡 Entity

### Category

![Category](https://user-images.githubusercontent.com/48785060/123540162-958c9d80-d778-11eb-82a7-13118d672d25.png)

### Meme

![Meme](https://user-images.githubusercontent.com/48785060/123540165-99b8bb00-d778-11eb-8b9e-bb1c46e7a577.png)

<br>

## 💡 Usecases

### Get Categories

```
Data:
  <API key>
Primary course:
  1. Send a request with API key to get a list of categories provided by the API provider.
  2. Validate a response.
  3. Save list as individual records.
Exceprion course:
  1. Show a error message on client.
```

### Create a category element

```
DATA:
  <CategoryTitle>,
  <Meme Gif Representing the Category>
Primary course:
  1. Create a html block element with category title and meme gif representing the category.
```

### Get a meme of category

```
Data:
  <API key>,
  <Category title>,
  <Maximum Meme Count>,
  <Random Number>
Primary course:
  1. Send a request with API key, Maximum Meme Count to get a list of meme of selected category.
  2. Validate a response.
  3. Get a meme with random number.
  4. Save a meme as Meme entity record.
  5. Show a meme on client.
Exception course:
  1. Show a error message on client.
```

### Copy a meme gif url on clipboard

```
Data:
  <gifUrl>
Primary course:
  1. Copy a meme gif url on clipboard when user clicked copy url button.
```
