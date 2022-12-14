import { Model as MongooseModel, Document } from 'mongoose';
import { Model } from '../Interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  protected model: MongooseModel<T & Document>;

  constructor(model: MongooseModel<T & Document>) {
    this.model = model;
  }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find({}, { __v: 0 });

  readOne = async (id: string): Promise<T | null> => this.model.findOne({ _id: id }, { __v: 0 });

  readOneByEmail = async (email: string):
    Promise<T | null> => this.model.findOne({ email }, { __v: 0 });

  readOneByPhone = async (phone: string):
    Promise<T | null> => this.model.findOne({ phone }, { __v: 0 });

  uploadImage = async (
    id: string,
    file: any
  ): Promise<T | null> => this.model.findByIdAndUpdate(id, { image: file });

  updateBannerList = async (customerId: string, bannerId: string): Promise<T
  | null> => this.model.findOneAndUpdate({ _id: customerId }, { $push: { banners: bannerId } });

  update = async (id: string, obj: T): Promise<T
  | null> => this.model.findOneAndUpdate({ _id: id }, { ...obj });

  delete = async (id: string): Promise<T | null> => this.model.findOneAndRemove(({ _id: id }));
}
