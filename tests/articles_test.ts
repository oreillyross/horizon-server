// TODO add jest and unit testing logic here, for now this is simply functions calling 
// the testing functions

import * as myImport from '../sources/import'
import { fakeArticles } from '../sources/fakeArticles'
//import { getArticles } from '../sources/articles'

//getArticles().then(console.log)

//console.log(myImport.main())

myImport.getSavedArticles(fakeArticles).then((result) => {
    console.log('Saved all articles, total: ', result.length)
})