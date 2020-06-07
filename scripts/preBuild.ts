import rimraf from 'rimraf';

rimraf('./dist',error => { if (error) throw error;});