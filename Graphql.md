http://localhost:1337/graphql

```graphql
query HomePage {
  homePage {
    data {
      id
      attributes {
        title
        hero {
          callToAction
          image {
            data {
              attributes {
                url
              }
            }
          }
          buttons {
            label
            url
          }
        }
        postsSelection {
          featuredPosts {
            data {
              attributes {
                title
                content
              }
            }
          }
        }
        seo {
          seoTitle
          seoDescription
        }
        servicesPreview {
          services {
            data {
              attributes {
                name
              }
            }
          }
        }
        featuredCourse {
          heading
          announcement
          course {
            data {
              attributes {
                title
              }
            }
          }
        }
        dynamicHomeSection {
          ...on ComponentLayoutMission {
            heading
            content
            showLogo
          }
          ...on ComponentLayoutNewsletterForm {
            heading
            subHeading
          }
        }
      }
    }
  }
}

mutation createPost {
  createPost(data:{title:"A GraphQL post", slug:"graphql", content:"Some example content"}) {
    data{
      id
      attributes{
        title
      }
    }
  }
}

mutation updatePost {
  updatePost(
    id: 6
    data: {
      content: "Some longer graphql content"
      publishedAt: "2022-04-22T10:30:15+01:00"
    }
  ) {
    data {
      id
      attributes {
        title
        content
      }
    }
  }
}

query Posts {
  posts(filters:{title:{contains:"Strapi"}}, sort:"content:desc", pagination:{page:2, pageSize:1}, publicationState:PREVIEW) {
    data {
      attributes{
        title
      }
    }
  }
}
```
