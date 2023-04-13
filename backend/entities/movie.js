import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      unique: true
    },
    titre: {
      type: String,
      unique:false
    },
    langue: {
      type: String,
      default: null,
      unique:false,
    },
    date: { 
      type: String,
      default: null
    },
    posterurl: { 
      type: String,
      default: null
    },
    backdroprul:{
      type:String,
      default: null
    },
    popularity:{
      type:'double precision'
    },
    votes:{
      type: 'integer',
      default:null,
    },
    vote_avg:{
      type:'double precision',
      default:null
    },
    adult:{
      type:Boolean,
      default:null
    },
    overview:{
      type:String,
      default:null
    },
    titre_origin:{
      type:String,
      default:null
    },
    comment:{
      type:String,
      default:"",
    }
  },
});

export default Movie;