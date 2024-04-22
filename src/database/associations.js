import MirrorCode from "../models/mirrorcode";
import Recording from "../models/recording";
import Memoryform from "../models/memoryform";
import Lifeform from "../models/lifeform";

export const MirrorCodeHasManyRecording = MirrorCode.hasMany(Recording, {
  foreignKey: "mirrorcodeId",
  as: "recordings",
});

export const RecordingBelongsToMirrorCode = Recording.belongsTo(MirrorCode, {
  allowNull: true,
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "mirrorcode",
});

export const MemoryformBelongsToManyLifeforms = Memoryform.belongsToMany(Lifeform, {
  through: MemoryformLifeform,
  as: 'lifeforms',
  foreignKey: 'memoryformId',
  otherKey: 'lifeformId',
});

export const LifeformBelongsToManyMemoryforms = Lifeform.belongsToMany(Memoryform, {
  through: MemoryformLifeform,
  as: 'memoryforms',
  foreignKey: 'lifeformId',
  otherKey: 'memoryformId',
});