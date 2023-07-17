import MirrorCode from "../models/mirrorcode";
import Recording from "../models/recording";

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
